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
    # Rails.logger.debug(canvas_params)
    $sketch_id = canvas_params[:sketch_id]
    @sketch = Sketch.find($sketch_id)
    # Rails.logger.debug(@sketch.title)
    # Rails.logger.debug("branch count: \n")
    # Rails.logger.debug(@sketch.branches.count)

    # Rails.logger.debug("um \n")
    if @sketch.branches.count == 0
      # Rails.logger.debug("hello!!\n")
      @master_branch = Branch.new(sketch_id: $sketch_id)
      @master_branch.save
      $branch_id = @master_branch.id
    end

    if canvas_params[:new_branch]
      @new_branch = Branch.new(sketch_id: $sketch_id)
      @new_branch.save
      $branch_id = @new_branch.id
    end

    # $branch_id = @master_branch.id

    # Rails.logger.debug($branch_id)
    $canvas_bg = canvas_params[:canvas_bg]
  end

  # GET /drawings/new
  def new
    @drawing = Drawing.new()
    @sketch_id = $sketch_id
    @canvas_bg = $canvas_bg
    @branch_id = $branch_id
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
      params.require(:drawing).permit(:new_branch, :sketch_id, :canvas_bg)
    end
end
