# README

## Backend local development

- Install `rvm` from some curl command on their website
- Install ruby-2.5.1 with rvm: `rvm install 2.5.1`
- In the directory, run `bundle install` to install dependencies
- Install Redis
- Install Postgres, they have a GUI version which is pretty great
- Run Postgres
- Reset all database information: `rails db:drop && rails db:create && rails db:migrate`
- Run rails server with `rails s`


### For Sidekiq local development testing
- In another window, run `redis-server`, to run redis server (used for storing sidekiq state)
- In another window, run `bundle exec sidekiq -c 2` to run the actual sidekiq workers


## Frontend development
- `cd client`, to go into the client folder
- `npm install` to install react dependencies
- `npm start` to start frontend