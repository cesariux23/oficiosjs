<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class TurnadoModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('turnado')->result());   
    }

    public function getall()
    {
    $this->db->order_by('id','asc');
        return $this->db->get('turnado')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        return $this->db->insert('turnado',$obj);
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('turnado',$obj);
    }

    public function delete($id)
    {
        return $this->db->delete('turnado', array('id' => $id)); 
    }

}