class Employee {
  constructor(
    emp_id,
    emp_doc_id,
    emp_name,
    emp_surname_one,
    emp_surname_two,
    emp_telephone,
    emp_email,
    emp_manager_id,
    emp_password,
    emp_hotel_id
  ) {
    this.emp_id = emp_id;
    this.emp_doc_id = emp_doc_id;
    this.emp_name = emp_name;
    this.emp_surname_one = emp_surname_one;
    this.emp_surname_two = emp_surname_two;
    this.emp_telephone = emp_telephone;
    this.emp_email = emp_email;
    this.emp_manager_id = emp_manager_id;
    this.emp_password = emp_password;
    this.emp_hotel_id = emp_hotel_id;
  }
}

module.exports = Employee;
