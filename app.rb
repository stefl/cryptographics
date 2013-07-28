require "sinatra"
require "haml"
require "padrino-helpers"

helpers Padrino::Helpers

get "/" do
  haml :index
end

post "/download" do
  content_type "image/svg"
  params[:svg]
end

post "/send" do
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
  Pony.mail(:to => params[:email], :from => 'cryptographics@makeshift.io', :subject => 'Your cryptographic', :body => 'Shhh... here is your cryptographic', :attachments => {"cryptographic.svg" => params[:svg]})
end