class Client {
  constructor({
    client_id,
    client_doc_type,
    client_doc_id,
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
  }) {
    this.client_id = client_id;
    this.client_doc_type = client_doc_type;
    this.client_doc_id = client_doc_id;
    this.client_name = client_name;
    this.client_surname_one = client_surname_one;
    this.client_surname_two = client_surname_two;
    this.client_telephone = client_telephone;
    this.client_email = client_email;
  }
}

module.exports = Client;
