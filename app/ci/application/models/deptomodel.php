<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class DeptoModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getall($id=null)
    {
        $this->db->order_by('id','desc');
        if(isset($id))
            $this->db->where('idArea',$id);
        return $this->db->get('departamento')->result();
    }

}