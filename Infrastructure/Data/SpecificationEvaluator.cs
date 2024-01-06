using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace Infrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        /// <summary>
        /// Method To Apply the specification to the dbset
        /// </summary>
        /// <param name="query">It's a dbset that is passed through the repositoy</param>
        /// <param name="specification">It's the where and includes clauses</param>
        /// <returns>IQuearyable with applied spec so we can apply ToListAsync or FirstOrDefault to retrieve it from database</returns>
        public static IQueryable<T> GetQuery(IQueryable<T> query, ISpecification<T> specification)
        {
            if(specification.Criteria != null)
                query = query.Where(specification.Criteria);

            if (specification.OrderByAscending != null)
                query = query.OrderBy(specification.OrderByAscending);

            if (specification.OrderByDescending != null)
                query = query.OrderByDescending(specification.OrderByDescending);

            if (specification.IsPagingEnable)
                query = query.Skip(specification.Skip).Take(specification.Take);

            // This will apply the current include clauses that is specified in the specification
            query = specification.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }
    }
}
