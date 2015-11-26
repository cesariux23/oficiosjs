<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class TurnoModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('turno')->result());   
    }

    public function search($id)
    {
        $this->db->where('turno',$id);
        return array_shift($this->db->get('turno')->result());  
    }

    public function getall($a,$m)
    {
    $this->db->order_by('id','desc');
    $this->db->like('fechaRecepcion',$a.'-'.str_pad($m, 2, "0", STR_PAD_LEFT),'after');
        return $this->db->get('turno')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        $this->db->insert('turno',$obj);
        return $this->db->insert_id();
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('turno',$obj);
    }

    public function delete($id)
    {
        return $this->db->delete('turno', array('id' => $id)); 
    }

}