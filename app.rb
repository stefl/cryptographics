require "sinatra"
require "haml"
require "padrino-helpers"

helpers Padrino::Helpers

get "/" do
  haml :index
end