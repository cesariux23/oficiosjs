<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class SeguimientoModel extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('seguimiento')->result());
    }

    public function search($id)
    {
        $this->db->where('seguimiento',$id);
        return array_shift($this->db->get('seguimiento')->result());
    }

    public function getall($t, $area, $count)
    {
      //funcion que me devuelde el seguimiento de los documentos

        //filtra por area
        $this->db->where('idArea',$area);

        //falta filtrar por departamento
        switch ($t) {
            case 1:
                # menos de 20 dias
                $this->db->where('diferencia <',20);
                break;
            case 2:
                # entre 21 y 30
                $this->db->where('diferencia >=',21);
                $this->db->where('diferencia <',30);
                break;
            case 3:
                # mas de 31 dias
                $this->db->where('diferencia >=',31);
                break;
        }

        if($count){
            return $this->db->count_all_results('seguimiento');
        }
        else{
            return $this->db->get('seguimiento')->result();
        }
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        $this->db->insert('seguimiento',$obj);
        return $this->db->insert_id();
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('seguimiento',$obj);
    }

}
