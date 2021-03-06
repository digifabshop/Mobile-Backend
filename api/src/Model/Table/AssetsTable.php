<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Assets Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Projects
 * @property \Cake\ORM\Association\BelongsTo $AssetTypes
 * @property \Cake\ORM\Association\BelongsToMany $Tags
 *
 * @method \App\Model\Entity\Asset get($primaryKey, $options = [])
 * @method \App\Model\Entity\Asset newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Asset[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Asset|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Asset patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Asset[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Asset findOrCreate($search, callable $callback = null, $options = [])
 */
class AssetsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('assets');
        $this->displayField('id');
        $this->primaryKey('id');

        $this->addBehavior('Search.Search');

        $this->belongsTo('Projects', [
            'foreignKey' => 'project_id'
        ]);
        $this->belongsTo('AssetTypes', [
            'foreignKey' => 'asset_type_id'
        ]);
        $this->belongsToMany('Tags', [
            'foreignKey' => 'asset_id',
            'targetForeignKey' => 'tag_id',
            'joinTable' => 'assets_tags'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        // $validator
        //     ->integer('id')
        //     ->allowEmpty('id', 'create');
        //
        // $validator
        //     ->allowEmpty('description');
        //
        // $validator
        //     ->integer('width')
        //     ->allowEmpty('width');
        //
        // $validator
        //     ->integer('height')
        //     ->allowEmpty('height');
        //
        // $validator
        //     ->boolean('in_progress')
        //     ->allowEmpty('in_progress');
        //
        // $validator
        //     ->boolean('visible')
        //     ->allowEmpty('visible');
        //
        // $validator
        //     ->allowEmpty('credit_name');
        //
        // $validator
        //     ->allowEmpty('credit_url');
        //
        // $validator
        //     ->allowEmpty('url');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        // $rules->add($rules->existsIn(['project_id'], 'Projects'));
        // $rules->add($rules->existsIn(['asset_type_id'], 'AssetTypes'));

        return $rules;
    }
}
