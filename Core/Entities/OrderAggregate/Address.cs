﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address(string firstName, string lastName, string city, string street, string state, string zipCode)
        {
            FirstName = firstName;
            LastName = lastName;
            City = city;
            Street = street;
            State = state;
            ZipCode = zipCode;
        }

        public Address()
        {
            
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
    }
}
