<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class paquete extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('paquetemodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":

			$id = explode("paquete/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){

			/*
			 Query the database to get the information 
			 about the book with ID = $id[1]
			*/

			 //$result = $obj->get_book_by_id($id[1]);
			 $result=$id[1];
			 //$result=$this->paquetemodel->getbyfecha($f[1]);

			}
			elseif (isset($_GET['fecha'])) {
				# code...
				$result=$this->paquetemodel->getallbyfecha($_GET['fecha']);
			}else{

			/*
			 Query the database to get the information 
			 about all the books
			*/

			 //$result = $this->paquetemodel->getall();
			 $result=$this->paquetemodel->getall($_GET['anio']);

			}

			break;

			case "POST":

			//Guarda los documentos emitidos en la base de datos
			$p = json_decode(file_get_contents("php://input"), false);

			$result =$this->paquetemodel->save($p);  //$emisiones;//$obj->register_new_book($_POST);

			break;

			case "PUT":

		// Retrieve additional data
			$p = json_decode(file_get_contents("php://input"), false);
			$result = $this->paquetemodel->update($p);

			break;

			case "DELETE":

			$id = explode("paquete/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){
				$result = $this->paquetemodel->delete($id[1]);
			}

			break;

		}

		$json = json_encode($result);
		echo $json;

		return;
	}
}