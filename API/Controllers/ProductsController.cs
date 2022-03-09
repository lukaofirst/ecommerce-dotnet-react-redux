using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
	public class ProductsController : BaseApiController
	{
		private readonly StoreContext _context;
		private readonly IMapper _mapper;

		public ProductsController(StoreContext context, IMapper mapper)
		{
			_mapper = mapper;
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<PagedList<Product>>> Get([FromQuery] ProductParams productParams)
		{
			var query = _context.Products
				.Sort(productParams.OrderBy)
				.Search(productParams.SearchTerm)
				.Filter(productParams.Brands, productParams.Types)
				.AsQueryable();

			var products = await PagedList<Product>.ToPagedList(query,
				productParams.PageNumber, productParams.PageSize);

			Response.AddPaginationHeader(products.MetaData);

			return products;
		}

		[HttpGet("{id}", Name = "GetProduct")]
		public async Task<ActionResult<Product>> GetProduct(int id)
		{
			var product = await _context.Products.FindAsync(id);

			if (product == null) return NotFound();

			return Ok(product);
		}

		[HttpGet("filters")]
		public async Task<IActionResult> GetFilters()
		{
			var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
			var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

			return Ok(new { brands, types });
		}

		[Authorize(Roles = "Admin")]
		[HttpPost]
		public async Task<ActionResult<Product>> CreateProduct(CreateProductDTO productDTO)
		{
			var product = _mapper.Map<Product>(productDTO);

			_context.Products.Add(product);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

			return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
		}

		[Authorize(Roles = "Admin")]
		[HttpPut]
		public async Task<ActionResult> UpdateProduct(UpdateProductDTO productDTO)
		{
			var product = await _context.Products.FindAsync(productDTO.Id);

			if (product == null) return NotFound();

			_mapper.Map(productDTO, product);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return NoContent();

			return BadRequest(new ProblemDetails { Title = "Problem updating product" });
		}

		[Authorize(Roles = "Admin")]
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteProduct(int id)
		{
			var product = await _context.Products.FindAsync(id);

			if (product == null) return NotFound();

			_context.Products.Remove(product);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return Ok();

			return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
		}
	}
}