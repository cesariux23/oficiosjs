<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class turno extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('turnomodel');
		$this->load->model('turnadomodel');
		$this->load->model('consecutivomodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":

			$id = explode("turno/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){

			/*
			 Query the database to get the information 
			 about the book with ID = $id[1]
			*/

			 //$result = $obj->get_book_by_id($id[1]);
			 $result=$this->turnomodel->getbyid($id[1]);
			 //$result=$this->turnomodel->getbyfecha($f[1]);

			}
			elseif (isset($_GET['turnado'])) {
				# code...
				$result=$this->turnadomodel->getall();
			}else{

			if(isset($_GET['num']))
			 	$result=$this->turnomodel->search($_GET['num']);
			 else
			 $result=$this->turnomodel->getall($_GET['a'],$_GET['m']);

			}

			break;

			case "POST":

			//Guarda los turnos en la base de datos
			$t = json_decode(file_get_contents("php://input"), false);
			$consecutivo=$consecutivo=$this->consecutivomodel->getconsecutivo(3);
			$t->turno="CD/".$this->consecutivomodel->getnumero($consecutivo,3)."/".date('Y');

			$result =$this->turnomodel->save($t);  //$emisiones;//$obj->register_new_book($_POST);

			break;

			case "PUT":

		// Retrieve additional data
			$p = json_decode(file_get_contents("php://input"), false);
			$result = $this->turnomodel->update($p);

			break;

			case "DELETE":

			$id = explode("turno/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){
				$result = $this->turnomodel->delete($id[1]);
			}

			break;

		}

		$json = json_encode($result);
		echo $json;

		return;
	}

	public function updateturnado()
	{
		# code...
		$t = json_decode(file_get_contents("php://input"), false);
		//si tiene id entonces solo se actualiza
		if(isset($t->id)){
			$r=$this->turnadomodel->update($t);
		}else{
			$t=$this->turnadomodel->save($t);

		}
	}

	public function deleteturnado($id)
	{
		# code...
		$id=explode("turno/deleteturnado/", $_SERVER['REQUEST_URI']);
		if($_SERVER['REQUEST_METHOD']=="DELETE"){
			$result = $this->turnadomodel->delete($id[1]);
		}
	}
}