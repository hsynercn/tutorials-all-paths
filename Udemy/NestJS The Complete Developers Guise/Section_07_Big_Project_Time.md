# Section 7: Big Project Time

We will create used car pricing API:

- Users sign up with email and password
- Users get an estimate for how much their car is worth based on the make/model/year/mileage
- Users can report what they sold their vehicles for
- Admins have to approve reported sales

We wil create a new project:

```cmd
nest new my-car-value
```

|Controllers|Services|Repositories|
|---|---|---|
|UsersController|UsersService|UsersRepository|
|ReportsController|ReportsService|ReportsRepository|

We will create a Users Module and Reports Module.

Repositories are very specific to use case, thus we will not create them automatically. On the other hand we will create 2 controllers and 2 services and 2 modules.

```cmd
nest g module users
nest g module reports
```

```cmd
nest g controller users
nest g controller reports
```

```cmd
nest g service users
nest g service reports
```

