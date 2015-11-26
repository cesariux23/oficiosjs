<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class RecepcionModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('recepcion')->result());   
    }

    public function search($id)
    {
        $this->db->where('recepcion',$id);
        return array_shift($this->db->get('recepcion')->result());  
    }

    public function getall($a,$m, $area)
    {
    $this->db->order_by('id','desc');
    $this->db->like('fechaRecepcion',$a.'-'.str_pad($m, 2, "0", STR_PAD_LEFT),'after');
        $this->db->where('idArea',$area);
        return $this->db->get('recepcion')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        $this->db->insert('recepcion',$obj);
        return $this->db->insert_id();
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('recepcion',$obj);
    }

}