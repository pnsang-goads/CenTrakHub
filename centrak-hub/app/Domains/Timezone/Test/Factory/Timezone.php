<?php declare(strict_types=1);

namespace App\Domains\Timezone\Test\Factory;

use App\Domains\CoreApp\Test\Factory\FactoryAbstract;
use App\Domains\Timezone\Model\Timezone as Model;

class Timezone extends FactoryAbstract
{
    /**
     * @var class-string<\App\Domains\Timezone\Model\Timezone>
     */
    protected $model = Model::class;

    /**
     * @return array
     */
    public function definition(): array
    {
        return [
            'zone' => preg_replace('/[^A-Za-z\s]/', '', $this->faker->name()),
            'default' => true,

            'geojson' => Model::db()->raw(Model::emptyGeoJSON()),
        ];
    }
}
