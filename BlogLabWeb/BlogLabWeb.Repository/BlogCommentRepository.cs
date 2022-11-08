using BlogLab.Models.BlogComment;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using BlogLab.Models.Photo;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using BlogLab.Models.Account;
using System.Collections.Generic;
using System.Linq;

namespace BlogLabWeb.Repository
{
    public class BlogCommentRepository : IBlogCommentRepository
    {
        private readonly Microsoft.Extensions.Configuration.IConfiguration _config;

        public BlogCommentRepository(Microsoft.Extensions.Configuration.IConfiguration config)
        {
            _config = config;
        }

        public async Task<int> DeleteAsync(int blogCommentId)
        {
            int affectedRows = 0;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "BlogComment_Delete",
                    new { BlogCommentId = blogCommentId },
                    commandType: CommandType.StoredProcedure);

            }

            return affectedRows;
        }

        public async Task<List<BlogComment>> GetAllAsync(int blogId)
        {
            IEnumerable<BlogComment> blogComments;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                blogComments = await connection.QueryAsync<BlogComment>(
                "BlogComment_GetAll",
                    new { BlogId = blogId },
                    commandType: CommandType.StoredProcedure);
            }

            return blogComments.ToList();
        }

        public async Task<BlogComment> GetAsync(int blogCommentId)
        {
            BlogComment blogComment;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                blogComment = await connection.QueryFirstOrDefaultAsync<BlogComment>(
                    "BlogComment_Get",
                    new { BlogCommentId = blogCommentId },
                    commandType: CommandType.StoredProcedure);
            }

            return blogComment;
        }

        public async Task<BlogComment> UpsertAsync(BlogCommentCreate blogCommentCreate, int applicationUserId)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("BlogCommentId", typeof(int));
            dataTable.Columns.Add("ParentBlogCommentId", typeof(int));
            dataTable.Columns.Add("BlogId", typeof(int));
            dataTable.Columns.Add("Content", typeof(string));


            dataTable.Rows.Add(
                blogCommentCreate.BlogCommentId,
                blogCommentCreate.ParentBlogCommentId,
                blogCommentCreate.BlogId,
                blogCommentCreate.Content);


            int? newBlogCommentId;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                newBlogCommentId = await connection.ExecuteScalarAsync<int?>(
                    "BlogComment_Upsert",
                    new { BlogComment = dataTable.AsTableValuedParameter("dbo.BlogCommentType") },
                    commandType: CommandType.StoredProcedure);
            }
            newBlogCommentId = newBlogCommentId ?? blogCommentCreate.BlogCommentId;
            
            BlogComment blogComment = await GetAsync(newBlogCommentId.Value);

            return blogComment;
        }
    }
}
