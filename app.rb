require "sinatra"
require "haml"
require "padrino-helpers"
require "pony"
require 'sinatra/flash'
require "base64"

helpers Padrino::Helpers

enable :sessions

get "/" do
  haml :index
end

get "/quilt" do
  haml :quilt
end

get "/pin" do
  haml :pin
end

get "/object" do
  haml :object
end

post "/download" do
  content_type "image/svg"
  params[:svg]
end

post "/email" do
  Pony.options = {
    :via => :smtp,
    :via_options => {
      :address => 'smtp.sendgrid.net',
      :port => '587',
      :domain => 'heroku.com',
      :user_name => ENV['SENDGRID_USERNAME'],
      :password => ENV['SENDGRID_PASSWORD'],
      :authentication => :plain,
      :enable_starttls_auto => true
    }
  }
  attach = params[:svg]
  Pony.mail(:to => params[:email],
    :from => 'cryptographics@makeshift.io',
    :subject => 'Your cryptographic',
    :body => 'Shhh... here is your cryptographic',
    :attachments => {"cryptographic.svg" => Base64.encode64(attach) },
    :headers => { "Content-Transfer-Encoding" => "base64" }
  )
  flash[:success] = "Your email has been sent"
  redirect "/"
end