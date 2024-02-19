const { gql } = require('apollo-server');
const bcrypt = require('bcryptjs');
const User = require('./models/UserModel'); 
const Employee = require('./models/EmployeeModel');

// GraphQL type definitions
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    salary: Float!
  }

  type Query {
    login(email: String!, password: String!): User
    getAllEmployees: [Employee]
    searchEmployeeById(_id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String, salary: Float!): Employee
    updateEmployeeById(_id: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
    deleteEmployeeById(_id: ID!): Employee
  }
`;

// Resolvers
const resolvers = {
  Query: {
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      return user;
    },
    async getAllEmployees() {
      return await Employee.find({});
    },
    async searchEmployeeById(_, { _id }) {
      return await Employee.findById(_id);
    },
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      return user;
    },
    async addNewEmployee(_, { first_name, last_name, email, gender, salary }) {
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });
      await newEmployee.save();
      return newEmployee;
    },
    async updateEmployeeById(_, { _id, first_name, last_name, email, gender, salary }) {
      const employee = await Employee.findById(_id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      if (first_name) employee.first_name = first_name;
      if (last_name) employee.last_name = last_name;
      if (email) employee.email = email;
      if (gender) employee.gender = gender;
      if (salary) employee.salary = salary;
      await employee.save();
      return employee;
    },
    async deleteEmployeeById(_, { _id }) {
      const employee = await Employee.findByIdAndDelete(_id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    },
  },
};

module.exports = { typeDefs, resolvers };
