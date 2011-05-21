class PhotosController < ApplicationController

  def index
    @photos = flickr.photos.search :tags => 'pig pickin'
    render :layout => false
  end

  private

  def flickr
    @flickr ||= Flickr.new 'config/flickr.yml'
  end

end
