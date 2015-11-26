<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class EmisionModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('emision')->result());   
    }

    public function search($id, $t)
    {
        $this->db->where('numero',$id);
        $this->db->where('tipoDocumento',$t);
        $this->db->order_by('id','desc');
        return array_shift($this->db->get('emision')->result());    
    }


    public function getall($a, $m, $area, $depto=null)
    {
        $this->db->order_by('id','desc');
        $this->db->like('fecha',$a.'-'.str_pad($m, 2, "0", STR_PAD_LEFT),'after');
        $this->db->where('idArea',$area);
        if(isset($depto)){
          $this->db->where('idDepartamento',$depto);  
        }
        return $this->db->get('emision')->result();
    }

    //insertar en la base de datos un objeto
    public function save($obj)
    {
        return $this->db->insert('emision',$obj);
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('emision',$obj);
    }

    public function busqueda($obj, $count=null)
    {
        $r=new stdClass();
        if(isset($obj->area)){
          $this->db->where('idArea',$obj->area);  
        }
        if(isset($obj->numero)){
            if($obj->numero!="")
                $this->db->like('numero',$obj->numero);  
        }
        if(isset($obj->tipo)){
          $this->db->where('tipoDocumento',$obj->tipo);  
        }
        if(isset($obj->anio)){
            if($obj->anio!="")
                $this->db->like('fecha',$obj->anio,'after');
        }
        if(isset($obj->asunto)){
            if($obj->asunto!="")
                $this->db->like('asunto',$obj->asunto);  
        }
        if(isset($obj->descripcion)){
            if($obj->descripcion!="")
                $this->db->like('descripcion',$obj->descripcion);  
        }
        if(isset($obj->destinatario)){
            if($obj->destinatario!="")
                $this->db->like('destinatario',$obj->destinatario);  
        }
        if(isset($obj->cargo)){
            if($obj->cargo!="")
                $this->db->like('cargo',$obj->cargo);  
        }
        if(isset($obj->ccp)){
            if($obj->ccp!="")
                $this->db->like('ccp',$obj->ccp);  
        }
        
        $this->db->order_by('id','desc');
        if(isset($count))
            return $this->db->count_all_results('emision');
        else{
            $this->db->limit(30);
            return $r->documentos=$this->db->get('emision')->result();
        }
        
    }

}