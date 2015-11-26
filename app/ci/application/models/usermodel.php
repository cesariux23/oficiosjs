<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class userModel extends CI_Model {
 
    public function __construct(){
        parent::__construct();
    }

    public function update($obj)
    {
        $this->db->where('id',$obj->id);
        unset($obj->id);
        return $this->db->update('user',$obj);
    }

    public function login($username,$password)
    {
        $this->db->where('username like binary "'.$username.'"',null, false);
        $this->db->where('password like binary "'.$password.'"',null, false);
        //$this->db->where('password',$password);
        $query = $this->db->get('user');
        if($query->num_rows() == 1)
        {
            return $query->row();
        }
    }

}
