<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class PaqueteModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('paquete')->result());   
    }

    public function getallbyfecha($fecha)
    {
        $this->db->where('fechaRecepcion',$fecha);
        return $this->db->get('paquete')->result();   
    }

    public function getall($y)
    {
        $this->db->select('fechaRecepcion');
        $this->db->like('fechaRecepcion',$y);
        $this->db->group_by('fechaRecepcion');
        $this->db->order_by('fechaRecepcion','asc');
        return $this->db->get('paquete')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        return $this->db->insert('paquete',$obj);
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('paquete',$obj);
    }

    public function delete($id)
    {
        return $this->db->delete('paquete', array('id' => $id)); 
    }

}