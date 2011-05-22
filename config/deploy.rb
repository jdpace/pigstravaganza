require "bundler/capistrano"

# Load RVM's capistrano plugin.    
require "rvm/capistrano"
set :rvm_ruby_string, '1.9.2'

set :application, "pigstravaganza.com"
set :repository,  "git@github.com:jdpace/pigstravaganza.git"

role :web, "66.228.60.153"
role :app, "66.228.60.153"
role :db,  "66.228.60.153", :primary => true

set :user, :deploy
set :use_sudo, false
set :ssh_options,      { :forward_agent => true }
default_run_options[:pty] = true

set :deploy_to, "/var/www/apps/#{application}"
set :deploy_via, :remote_cache
set :copy_cache, true
set :copy_exclude, [".git"]
set :copy_compression, :bz2

set :scm, :git
set :scm_verbose, true
set(:current_branch) { `git branch`.match(/\* (\S+)\s/m)[1] || raise("Couldn't determine current branch") }
set :branch, defer { current_branch }

after "deploy:update_code", "barista:brew"
after "deploy", "deploy:tag_last_deploy"
set :rails_env, "production"

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end

  task :tag_last_deploy do
    timestamp_string_without_seconds = Time.now.strftime("%Y%m%d%H%M")
    set :tag_name, "deployed_to_#{rails_env}_#{timestamp_string_without_seconds}"
    `git tag -a -m "Tagging deploy to #{rails_env} at #{timestamp_string_without_seconds}" #{tag_name} #{branch}`
    `git push --tags > /dev/null 2>&1 &` # git push in background so it doesn't slow down deploys
    run "date > #{current_path}/DEPLOY_TIME"

    puts "Tagged release with #{tag_name}, pushing tags in the background."
  end

  task :seed do
    run %{cd #{latest_release} && RAILS_ENV=#{rails_env} rake db:seed --trace}
  end
end

namespace :barista do
  task :brew do
    run %{cd #{release_path} && bundle exec rake barista:brew}
  end
end
