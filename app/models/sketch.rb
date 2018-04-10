class Sketch < ApplicationRecord
	belongs_to :user
	validates :description, presence: true, length: { maximum: 140 }
	validates :title, presence: true, length: { maximum: 60 }
end
