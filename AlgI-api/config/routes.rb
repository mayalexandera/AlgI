Rails.application.routes.draw do
  get 'image_properties/upvote:integer'
  get 'image_properties/downvote:integer'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
