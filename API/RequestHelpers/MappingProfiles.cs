using API.DTO;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			CreateMap<CreateProductDTO, Product>();
			CreateMap<UpdateProductDTO, Product>();
		}
	}
}