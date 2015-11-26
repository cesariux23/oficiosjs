<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class emision extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('emisionmodel');
		$this->load->model('consecutivomodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":

			$id = explode("emision/", $_SERVER['REQUEST_URI']);

			if (isset($id[1])){

			/*
			 Query the database to get the information 
			 about the book with ID = $id[1]
			*/

			 //$result = $obj->get_book_by_id($id[1]);
			 $result=$this->emisionmodel->getbyid($id[1]);

			}
			else {

			/*
			 Query the database to get the information 
			*/
			 //se busca por numero de doc
			 if(isset($_GET['num']))
			 	$result=$this->emisionmodel->search($_GET['num'], $_GET['t']);
			 else{
			 	//regresa todos
			 	if (isset($_GET['depto'])) {
			 		$result = $this->emisionmodel->getall($_GET['a'],$_GET['m'],$_GET['area'],$_GET['depto']);
			 	}
			 	else
			 		$result = $this->emisionmodel->getall($_GET['a'],$_GET['m'],$_GET['area']);
			 }

			}

			break;

			case "POST":

			//Guarda los documentos emitidos en la base de datos
			$d = json_decode(file_get_contents("php://input"), false);
			//informacion del documento
			$documento=$d->doc;

			//se obtiene el id del consecutivo
			switch ($documento->tipoEmision) {
				case '0':
					# interno...
					$consecutivo=$this->consecutivomodel->getconsecutivo($documento->idArea);
					break;
				case '1':
					# externo...
					$consecutivo=$this->consecutivomodel->getconsecutivo(1);
					if($d->abreviacion!="DG")
						$d->abreviacion="DG/".$d->abreviacion;
					break;
				case '2':
					# departamento...
					$consecutivo=$this->consecutivomodel->getconsecutivo($documento->idArea, $documento->idDepartamento);
					break;
			}

			$emisiones= array();
			foreach ($d->destinatarios as $des) {
				# code...
				//$result=$result.$des->nombre;
				//$emisiones[]=$des;
				
				$nuevo=$documento;
				$nuevo->fecha=date("Y-m-d");
				$nuevo->creacion=date("Y-m-d H:i:s");
				$nuevo->destinatario=$des->nombre;
				$nuevo->cargo=$des->cargo;
				$nuevo->numero=$d->abreviacion."/".$this->consecutivomodel->getnumero($consecutivo,$documento->tipoDocumento)."/".Date('Y');
				$this->emisionmodel->save($nuevo);
				$emisiones[]=clone $nuevo;

			}

			$result=$emisiones;

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

	public function search()
	{
		$d = json_decode(file_get_contents("php://input"), false);
		$result=new stdClass();
		$result->total=$this->emisionmodel->busqueda($d, true);
		$result->documentos=$this->emisionmodel->busqueda($d);
		//busque de documentos
		$json = json_encode($result);
		echo $json;
		return;
	}
}