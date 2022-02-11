using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // you need to add the navigation properties with Basket entity
        // to avoid inconsistency, for example, to enable delete on cascade
        // you need a foreign key to do that
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}