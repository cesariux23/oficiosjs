<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class AreaModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('area')->result());   
    }

    public function getall()
    {
        $this->db->order_by('id','desc');
        return $this->db->get('area')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        return $this->db->insert('area',$obj);
    }

}