# DB Grammar
Parser based on https://github.com/Chevrotain/chevrotain For Db Diagram like tool currently able to Parse 
```
// Test Comment
Table products {
  id int [pk]
  name varchar
  merchant_id int [not null]
  price int
  status products_status
  created_at datetime 
}
Table merchants {
  id int [ref: > products.id]
  country_code int
  merchant_name varchar
  created_at varchar
  admin_id int
}
Table users {
    id int [pk, not null]
    username string
    password [default: admin]
}
Ref: users.id - merchants.id 
```