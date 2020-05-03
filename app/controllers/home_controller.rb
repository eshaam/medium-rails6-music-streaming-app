class HomeController < ApplicationController
  def index
    @songs = Song.all_songs
  end
end
