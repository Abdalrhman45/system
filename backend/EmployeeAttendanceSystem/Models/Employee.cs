public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public List<Attendance> Attendances { get; set; } = new();
}
