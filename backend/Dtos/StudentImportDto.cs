﻿namespace backend.Dtos
{
    public class StudentImportDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }  // Format expected from CSV: "M/d/yyyy"
        public string Address { get; set; }
    }
}
