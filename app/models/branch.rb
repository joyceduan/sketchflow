class Branch < ApplicationRecord
	belongs_to :sketch
	has_many :drawings
end
