require 'audioinfo'

class SongMetaDataExtractor

  def initialize(file: f)
    AudioInfo.open(file) do |info|
      @artist = info.artist
      @name = info.title
      @time = info.length
      @album = info.album
    end
  end

  def data
    {
      artist: @artist,
      name: @name,
      time: @time,
      album: @album
    }
  end

end
