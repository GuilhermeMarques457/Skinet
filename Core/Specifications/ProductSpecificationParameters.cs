﻿namespace Core.Specifications
{
    public class ProductSpecificationParameters
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }

        // Saying that Case does not matter in search
        private string _search;
        public string Search 
        {
            get => _search;
            set => _search = value.ToLower();
        }

        // Setting the max number of page size(50) cannot be passed
        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}
