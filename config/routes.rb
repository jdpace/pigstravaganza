PigstravaganzaCom::Application.routes.draw do

  resource :dashboard
  resources :photos, :only => [:index]
  root :to => 'dashboards#show'

end
