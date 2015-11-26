<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('usermodel');
		$this->load->model('areamodel');
		$this->load->model('departamentomodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":

			$id = explode("user/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){

			/*
			 Query the database to get the information 
			 about the book with ID = $id[1]
			*/

			 //$result = $obj->get_book_by_id($id[1]);
			 $result=$this->usermodel->getbyid($id[1]);
			
			}else{
			$result=null;
			}
			

			break;

			case "POST":

			//Guarda los documentos emitidos en la base de datos
			$u = json_decode(file_get_contents("php://input"), false);
			//informacion del usuario
			$result=$this->usermodel->update($u);

			//$result = $emisiones;//$obj->register_new_book($_POST);

			break;

			case "PUT":

		// Retrieve additional data
			$d = json_decode(file_get_contents("php://input"), false);
			$d->modificacion=date("Y-m-d H:i:s");
			$result = $this->emisionmodel->update($d);

			break;

			case "DELETE":

			$id = explode("book/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){
				$result = $obj->delete_book($id[1]);
			}

			break;

		}

		$json = json_encode($result);
		echo $json;

		return;
	}

	public function login(){
		if(preg_match('/\s/', $_GET['login']) || preg_match('/\s/', $_GET['password']))
			$datos['status']=0;
		else{
		$user=$this->usermodel->login($_GET['login'],$_GET['password']);
		if(isset($user)){
			$datos['status']=1;
			if(!$user->cambioContra){
				unset($user->password);
			}
			$a=$this->areamodel->getbyid($user->idArea);
			unset($a->id);
			$user->area=$a;
			$d=$this->departamentomodel->getbyid($user->idDepartamento);
			unset($d->id);
			unset($d->idArea);
			$user->depto=$d;
			$datos['user']=$user;

		}
		else
			$datos['status']=0;
		}

		
		//$datos['conductores']=$this->personamodel->disponibles();
		echo json_encode($datos,JSON_UNESCAPED_UNICODE);
	}
}
