class DrawingsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_drawing, only: [:show, :edit, :update, :destroy]

  # GET /drawings
  # GET /drawings.json
  def index
    @drawings = Drawing.all
  end

  # GET /drawings/1
  # GET /drawings/1.json
  def show
  end

  # POST /drawings/canvas
  def canvas
    $sketch_id = canvas_params[:sketch_id]
    @sketch = Sketch.find($sketch_id)
    if @sketch.branches.count == 0
      @master_branch = Branch.new(sketch_id: $sketch_id)
      @master_branch.save
      $branch_id = @master_branch.id
    end

    if canvas_params[:new_branch]
      @new_branch = Branch.new(sketch_id: $sketch_id)
      @new_branch.save
      $branch_id = @new_branch.id
    end

    # merging into master
    if canvas_params[:merge_branch]
      Rails.logger.debug("hi sketch branches")
      Rails.logger.debug(@sketch.branches.first.id)

      Rails.logger.debug("master branch last drawing")
      # Rails.logger.debug(@sketch.branches.first.drawings.last.data_url)
      $master_bg = @sketch.branches.first.drawings.last.data_url
      Rails.logger.debug($master_bg)
      $branch_id = @sketch.branches.first.id
    end

    # $branch_id = @master_branch.id

    # Rails.logger.debug($branch_id)
    $canvas_bg = canvas_params[:canvas_bg]
  end

  # POST /drawings/merge
  def merge
    @drawing = Drawing.new(drawing_params)
    @sketch = Sketch.find(drawing_params[:sketch_id])

    respond_to do |format|
      if @drawing.save
        @sketch.update_attributes(:data_url => drawing_params[:data_url])
        format.html { redirect_to @drawing, notice: 'Drawing was successfully created.' }
        format.json { render :show, status: :created, location: @drawing }
      else
        format.html { render :new }
        format.json { render json: @drawing.errors, status: :unprocessable_entity }
      end
    end
  end


  # GET /drawings/new
  def new
    @drawing = Drawing.new()
    @sketch_id = $sketch_id
    @canvas_bg = $canvas_bg
    @branch_id = $branch_id
    @master_bg = $master_bg

    Rails.logger.debug("master branch new url") 
    Rails.logger.debug(@master_bg)

    if @master_bg
      @merge = true
      Rails.logger.debug("merge is true")
    else 
      @merge = false
    end  
  end

  # GET /drawings/1/edit
  def edit
  end

  # POST /drawings
  # POST /drawings.json
  def create
    @drawing = Drawing.new(drawing_params)
    @sketch = Sketch.find(drawing_params[:sketch_id])

    respond_to do |format|
      if @drawing.save
        @sketch.update_attributes(:data_url => drawing_params[:data_url])
        format.html { redirect_to @drawing, notice: 'Drawing was successfully created.' }
        format.json { render :show, status: :created, location: @drawing }
      else
        format.html { render :new }
        format.json { render json: @drawing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /drawings/1
  # PATCH/PUT /drawings/1.json
  def update
    respond_to do |format|
      if @drawing.update(drawing_params)
        format.html { redirect_to @drawing, notice: 'Drawing was successfully updated.' }
        format.json { render :show, status: :ok, location: @drawing }
      else
        format.html { render :edit }
        format.json { render json: @drawing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /drawings/1
  # DELETE /drawings/1.json
  def destroy
    @drawing.destroy
    respond_to do |format|
      format.html { redirect_to drawings_url, notice: 'Drawing was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_drawing
      @drawing = Drawing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def drawing_params
      params.require(:drawing).permit(:sketch_id, :branch_id, :data_url)
    end

    def canvas_params
      params.require(:drawing).permit(:new_branch, :merge_branch, :sketch_id, :canvas_bg)
    end
end
