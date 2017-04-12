<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * People Controller
 *
 * @property \App\Model\Table\PeopleTable $People
 */
class PeopleController extends AppController
{
    function upload() {
        $ext  = explode('/', $this->request->data['file']['type']);
        $name = uniqid() . '.' . $ext[1];
        $path = '/var/www/html/api/webroot/uploads/people/' . $name;
        $url  = "/uploads/people/$name";
        if (move_uploaded_file($this->request->data['file']['tmp_name'], $path)) {
            $this->set('response', ['url' => $url]);
            $this->set('_serialize', 'response');
        }
    }
}
