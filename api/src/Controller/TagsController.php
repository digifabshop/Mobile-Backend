<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Tags Controller
 *
 * @property \App\Model\Table\TagsTable $Tags
 */
class TagsController extends AppController
{
    public function path($id = 1) {
        $children = $this->Tags->find('path', ['for' => $id]);
        $this->set('data', $children);
        $this->set('_serialize', ['data']);
    }

    public function children($id = 1) {
        $children = $this->Tags->find('children', ['for' => $id, 'direct' => true]);
        $this->set('data', $children);
        $this->set('_serialize', ['data']);
    }

}
