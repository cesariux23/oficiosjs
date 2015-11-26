<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class DepartamentoModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('departamento')->result());   
    }

    public function getall()
    {
        $this->db->order_by('id','desc');
        return $this->db->get('departamento')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        return $this->db->insert('departamento',$obj);
    }

}