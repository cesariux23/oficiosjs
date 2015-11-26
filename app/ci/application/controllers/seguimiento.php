<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class seguimiento extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('seguimientomodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":

			$id = explode("seguimiento/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){

			/*
			 Query the database to get the information 
			 about the book with ID = $id[1]
			*/

			 //$result = $obj->get_book_by_id($id[1]);
			 $result=$id[1];
			 //$result=$this->seguimientomodel->getbyfecha($f[1]);

			}
			else{
				
				if(isset($_GET['count'])){
					//arrego que contiene el concentrado
					$result=array();
					//todos
					$result['todos']=$this->seguimientomodel->getall(0, $_GET['area'], true);
					//menos de 25
					$result['uno']=$this->seguimientomodel->getall(1, $_GET['area'], true);
					//menos de 45
					$result['dos']=$this->seguimientomodel->getall(2, $_GET['area'], true);
					//mas de 45
					$result['tres']=$this->seguimientomodel->getall(3, $_GET['area'], true);

				}else
			 		$result=$this->seguimientomodel->getall($_GET['tipo'], $_GET['area'], false);
			}

			break;

			case "POST":

			//Guarda los documentos emitidos en la base de datos
			$p = json_decode(file_get_contents("php://input"), false);

			$result =$this->seguimientomodel->save($p);  //$emisiones;//$obj->register_new_book($_POST);

			break;

			case "PUT":

		// Retrieve additional data
			$p = json_decode(file_get_contents("php://input"), false);
			$result = $this->seguimientomodel->update($p);

			break;

			case "DELETE":

			$id = explode("seguimiento/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){
				$result = $this->seguimientomodel->delete($id[1]);
			}

			break;

		}

		$json = json_encode($result);
		echo $json;

		return;
	}
}