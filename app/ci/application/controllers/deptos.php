<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class deptos extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('deptomodel');
	  }



	public function index($id=null)
	{
		switch ($_SERVER['REQUEST_METHOD']) {

			case "GET":
			 	$result = $this->deptomodel->getall($_GET['idArea']);
			break;
		}

		$json = json_encode($result, JSON_UNESCAPED_UNICODE);
		echo $json;

		return;
	}
}