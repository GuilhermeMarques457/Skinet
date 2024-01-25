
namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
            StatusCode = statusCode;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request, you have made",
                401 => "Unauthorized, you are not",
                404 => "Resouce found, it was not",
                500 => "Server error, contact support",
                _ => "Unexpected Error"
            };
        }

    }
}
