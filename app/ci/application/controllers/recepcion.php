<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class recepcion extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('recepcionmodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":

			$id = explode("recepcion/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){

			/*
			 Query the database to get the information 
			 about the book with ID = $id[1]
			*/

			 //$result = $obj->get_book_by_id($id[1]);
			 $result=$id[1];
			 //$result=$this->recepcionmodel->getbyfecha($f[1]);

			}
			else{
			 $result=$this->recepcionmodel->getall($_GET['a'],$_GET['m'], $_GET['area']);
			}

			break;

			case "POST":

			//Guarda los documentos emitidos en la base de datos
			$p = json_decode(file_get_contents("php://input"), false);

			$result =$this->recepcionmodel->save($p);  //$emisiones;//$obj->register_new_book($_POST);

			break;

			case "PUT":

		// Retrieve additional data
			$p = json_decode(file_get_contents("php://input"), false);
			$result = $this->recepcionmodel->update($p);

			break;

			case "DELETE":

			$id = explode("recepcion/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){
				$result = $this->recepcionmodel->delete($id[1]);
			}

			break;

		}

		$json = json_encode($result);
		echo $json;

		return;
	}
}