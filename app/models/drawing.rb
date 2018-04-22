class Drawing < ApplicationRecord
	belongs_to :branch
	belongs_to :sketch
end
