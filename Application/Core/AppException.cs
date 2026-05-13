using System;

namespace Application.Core;

public class AppException(int StatusCode, string message, string? details)
{
public int statusCode {get; set;} = StatusCode;
public string message {get; set;} =message;
public string Details {get; set;} = details;
}
