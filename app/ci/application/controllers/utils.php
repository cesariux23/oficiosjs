<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class utils extends CI_Controller {
	public function __construct()
	  {
		parent::__construct();
		$this->load->model('deptomodel');
	  }



	public function hoy()
	{
		echo date("Y-m-d H:i:s");
		return;
	}
}