<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class ConsecutivoModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }
    //obtiene por id
    public function getbyid($id)
    {
        $this->db->where('id',$id);
        return array_shift($this->db->get('consecutivo')->result());   
    }

    //obtiene el id del consecutivo solicitado para generar los numeros de oficio
    public function getconsecutivo($area, $depto=null)
    {
        //año actual
        $anio=Date('Y');
        //se crea un objeto con las propiedades listo para ser insertado en caso de no existir en la BD
        $c=new stdClass();
        $c->idArea=$area;
        $c->anio=$anio;
        //se agregan los where para todo tipo de emision
        $this->db->where('idArea',$area);
        $this->db->where('anio',$anio);
        
        //si es con cuenta del departamento se agrega el id del depto.
        if(isset($depto)){
        	$this->db->where('idDepartamento',$depto);
            $c->idDepartamento=$depto;
        }
        else
            //se deja en null para obtener solo el del área
        	$this->db->where(array('idDepartamento' => null),FALSE);
        //se obtiene el primer resultado
        $consecutivo=array_shift($this->db->get('consecutivo')->result());
        //si no existe en BD se inserta el objeto $c
        if(!isset($consecutivo))
            $consecutivo=$this->insert($c);

        // se regresa el id
        return $consecutivo->id;   
    }

    //insertar en la base de datos un objeto
    public function insert($obj)
    {
        return $this->db->insert('consecutivo',$obj)->result();
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('consecutivo',$obj);
    }

    public function getnumero($id,$tipo)
    {
        $consecutivo=$this->getbyid($id);
        switch ($tipo) {
            case '0':
                # oficio
                $numero=$consecutivo->oficio++;
                break;
            case '1':
                # tarjeta
                $numero=$consecutivo->tarjeta++;
                break;
            case '2':
                # circular
                $numero=$consecutivo->circular++;
                break;
            case '3':
                # turno
                $numero=$consecutivo->turno++;
                break;
        }

        $this->update($consecutivo);

        return str_pad($numero, 4, "0", STR_PAD_LEFT);

    }

}